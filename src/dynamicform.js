import React from "react";

const DynamicForm = ({ formData }) => {
  console.log("formdata is like as ; ", formData);

  const renderField = (field, index) => {
    switch (field.type) {
      case "textarea":
        return (
          <>
            <label>{field.label}</label>
            <textarea
              key={index}
              placeholder={field.value}
              rows="4"
              cols="50"
              required={field.required}
              className="border rounded-md p-2 mt-2 w-full"
            />
          </>
        );
      case "checkbox":
        return (
          <>
            <label>{field.label}</label>
            <div key={index} className="mt-2">
              {field.options.map((option, i) => (
                <label key={i} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option.opvalue}
                    className="form-checkbox size-4"
                  />
                  <span className="ml-2">{option.text}</span>
                </label>
              ))}
            </div>
          </>
        );
      case "text":
        return (
          <input
            key={index}
            type={field.inputType}
            placeholder={field.value}
            required={field.required}
            className="border rounded-md p-2 mt-2 w-full"
          />
        );
      case "radio":
        return (
          <>
            <label>{field.label}</label>
            <div key={index} className="mt-2">
              {field.options.map((option, i) => (
                <label key={i} className="flex items-center m-2">
                  <input
                    type="radio"
                    name={field.label}
                    value={option.opvalue}
                    className="form-radio size-4"
                  />
                  <span className="ml-2">{option.text}</span>
                </label>
              ))}
            </div>
          </>
        );
      case "select":
        return (
          <>
            <label>{field.label}</label>
            <select
              key={index}
              required={field.required}
              className="border rounded-md p-2 mt-2 w-full"
            >
              <option value="">Select...</option>
              {field.options.map((option, i) => (
                <option key={i} value={option.opvalue}>
                  {option.text}
                </option>
              ))}
            </select>
          </>
        );
      case "button":
        return (
          <button
            key={index}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
          >
            {field.label}
          </button>
        );
      case "header":
        return (
          <div className="text-center">
            <h2 key={index} className="text-lg font-semibold mt-4">
              {field.label}
            </h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form className="max-w-lg mx-auto m-2">
      {formData.map((field, index) => renderField(field, index))}
    </form>
  );
};

export default DynamicForm;
