import { useRef, useState } from "react";
import { Avatar, Combobox, useCombobox } from "@mantine/core";
import axios from "../../axios/axios.js";
import { useNavigate } from "react-router-dom";

async function getAsyncData(query, signal) {
  if (query === "") return [];
  try {
    const response = await axios.post("users/search", { query });
    return response.data;
  } catch (ex) {}
}

export function UsersSearchInput() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [value, setValue] = useState("");
  const [empty, setEmpty] = useState(false);
  const abortController = useRef();

  const fetchOptions = (query) => {
    abortController.current?.abort();
    abortController.current = new AbortController();

    getAsyncData(query, abortController.current.signal)
      .then((result) => {
        setData(result);
        setEmpty(result.length === 0);
        abortController.current = undefined;
      })
      .catch(() => {});
  };
  const options = (data || []).map((item) => (
    <Combobox.Option
      style={{ width: "full", padding: "0.6rem" }}
      value={item?._id}
      key={item?._id}
    >
      <div className="flex items-center justify-start gap-4">
        <Avatar size={"48px"} src={item?.avatar} />{" "}
        {item?.firstname + " " + item?.lastname}
      </div>
    </Combobox.Option>
  ));

  return (
    <Combobox
      style={{
        width: "100%",
        height: "100%",
        padding: "0",
      }}
      onOptionSubmit={(optionValue) => {
        setValue("");
        navigate(`/profile/${optionValue}`);
        combobox.closeDropdown();
      }}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <input
          placeholder="Search for friends"
          className="outline-0 border-0 bg-transparent w-full px-2"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            fetchOptions(event.currentTarget.value);
            combobox.resetSelectedOption();
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => {
            combobox.openDropdown();
            if (data === null) {
              fetchOptions(value);
            }
          }}
          onBlur={() => combobox.closeDropdown()}
          // rightSection={loading && <Loader size={18} />}
        />
      </Combobox.Target>

      <Combobox.Dropdown
        style={{
          display: "block",
          justifyContent: "center",
          top: "52px",
          left: 0,
          minWidth: "100%",
          borderRadius: "1rem",
          padding: 0,
          border: "none",
        }}
        w={"full"}
        hidden={data === null}
      >
        <Combobox.Options style={{ width: "100%" }}>
          {options}
          {/* {empty && (
            <Combobox.Empty style={{ width: "100%", padding: "0.6rem" }}>
              No results found
            </Combobox.Empty>
          )} */}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
