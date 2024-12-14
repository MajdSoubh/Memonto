import fs from "fs";

export const validator = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params };
    // If schema is a function, call it with request to generate the schema dynamically
    const resolvedSchema = typeof schema === "function" ? schema(req) : schema;
    const errors = resolvedSchema.validate(data, { abortEarly: false }).error
      ?.details;
    // If validation fails
    if (errors) {
      // Delete request files.
      if (req?.files && req.files.length > 0) {
        req.files.forEach((file) => {
          fs.unlinkSync(file.path);
        });
      }

      // Organize errors.
      const prettyErrors = errors?.map((error) => {
        return {
          label: error.context.label,
          key: error.context.key,
          message: error.message,
        };
      });

      return res.status(422).json({ errors: prettyErrors });
    } else {
      next();
    }
  };
};
