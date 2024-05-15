import React, { useState } from "react";
import DynamicForm from "./dynamicform";

const App = () => {
  const [formFields, setFormFields] = useState([]);
  const [show, setShow] = useState(false);
  const [jsondisplayed, setJsonDisplayed] = useState(false);

  const addField = (type) => {
    let field = {
      type: type,
      label: "",
      value: "",
      options: [],
      inputType: "",
      tag: "",
      required: false,
    };
    if (type === "radio") {
      field.options = ["Option 1", "Option 2"];
    } else if (type === "checkbox" || type === "select") {
      field.options = [
        { text: "Option Name 1", opvalue: "value1" },
        { text: "Option Name 2", opvalue: "value2" },
      ];
    }
    setFormFields([...formFields, field]);
  };

  const handleFieldChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      if (type === "checkbox") {
        updatedFields[index] = { ...updatedFields[index], [name]: checked };
      } else {
        updatedFields[index] = { ...updatedFields[index], [name]: value };
      }
      return updatedFields;
    });
  };

  const addOption = (index) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index].options.push({ text: "", opvalue: "" });
      return updatedFields;
    });
  };

  const removeOption = (fieldIndex, optionIndex) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[fieldIndex].options.splice(optionIndex, 1);
      return updatedFields;
    });
  };

  const removeField = (index) => {
    setFormFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const moveElement = (action, index) => {
    if (action === 'up' && index > 0) {
      setFormFields((prevFields) => { 
        const updatedFields = [...prevFields];
        [updatedFields[index], updatedFields[index - 1]] = [updatedFields[index - 1], updatedFields[index]];
        return updatedFields;
      });
    }
    if (action === 'down' && index < formFields.length - 1) {
      setFormFields((prevFields) => { 
        const updatedFields = [...prevFields];
        [updatedFields[index], updatedFields[index + 1]] = [updatedFields[index + 1], updatedFields[index]];
        return updatedFields;
      });
    }
  }
  
  return (
    <div className="container">
      <div className="space-y-8 mt-40 sm:mt-64 md:mt-52 lg:mt-40">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 bg-slate-200 px-2 py-4 fixed w-full top-0">
          <button
            className="btn bg-blue-950 text-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("textarea")}
          >
            Add Textarea
          </button>
          <button
            className="btn bg-blue-950 text-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("checkbox")}
          >
            Add Checkbox
          </button>
          <button
            className="btn bg-blue-950 text-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("text")}
          >
            Add Text Field
          </button>
          <button
            className="btn bg-blue-950 text-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("radio")}
          >
            Add Radio Button
          </button>
          <button
            className="btn bg-blue-950 text-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("select")}
          >
            Add Select Dropdown
          </button>
          <button
            className="btn bg-blue-950 text-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("button")}
          >
            Add Button
          </button>
          <button
            className="btn bg-blue-950 text-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("header")}
          >
            Add Header Text
          </button>
        </div>

        {formFields.map((field, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center">
              <input
                type="text"
                name="label"
                placeholder="Label"
                value={field.label}
                onChange={(e) => handleFieldChange(index, e)}
                className="input mx-3 p-2 my-2"
              />
              {field.type === "text" ? (
                <>
                  <select
                    className="input px-4 py-2"
                    name="inputType"
                    onChange={(e) => {
                      handleFieldChange(index, e);
                    }}
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="password">Password</option>
                    <option value="number">Number</option>
                  </select>
                </>
              ) : null}
              {field.type === "header" ? (
                <>
                  <select
                    className="input px-4 py-2"
                    name="tag"
                    onChange={(e) => {
                      handleFieldChange(index, e);
                    }}
                  >
                    <option value="h1">h1</option>
                    <option value="h2">h2</option>
                    <option value="h3">h3</option>
                    <option value="h4">h4</option>
                    <option value="h5">h5</option>
                    <option value="h6">h6</option>
                  </select>
                </>
              ) : null}
              {field.type === "text" || field.type === "textarea" ? (
                <textarea
                  name="value"
                  placeholder="Default Value"
                  value={field.value}
                  onChange={(e) => handleFieldChange(index, e)}
                  className="input mx-3 p-2 h-10"
                />
              ) : null}
            </div>
            {field.type === "radio" ? (
              <>
                <input
                  type="text"
                  name="value"
                  placeholder="value"
                  onChange={(e) => handleFieldChange(index, e)}
                  className="input my-2 mx-3 p-2 block"
                />
                {field.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-4 space-y-0"
                  >
                    <input
                      type={field.type}
                      name={`option-${index}-${optionIndex}`}
                      checked={field.value === option.opvalue}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="input mx-3 p-2"
                    />
                    <input
                      type="text"
                      name={`option-${index}-${optionIndex}`}
                      placeholder="Option"
                      value={option.text}
                      onChange={(e) => {
                        const newOptions = [...field.options];
                        newOptions[optionIndex] = {
                          ...option,
                          text: e.target.value,
                        };
                        setFormFields((prevFields) => {
                          const updatedFields = [...prevFields];
                          updatedFields[index].options = newOptions;
                          return updatedFields;
                        });
                      }}
                      className="input mx-3 p-2"
                    />
                    <button
                      className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
                      onClick={() => removeOption(index, optionIndex)}
                    >
                      Remove Option
                    </button>
                  </div>
                ))}
                <button
                  className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
                  onClick={() => addOption(index)}
                >
                  Add Option
                </button>
              </>
            ) : (
              ""
            )}
            {field.type === "checkbox" ? (
              <>
                {field.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-4 space-y-0"
                  >
                    <input
                      type={field.type}
                      name={`option-${index}-${optionIndex}`}
                      checked={field.value === option.opvalue}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="checkbox mx-3 p-2"
                    />

                    <div className="flex items-center">
                      <input
                        type="text"
                        name={`option-text-${index}-${optionIndex}`}
                        placeholder="Option"
                        value={option.text}
                        onChange={(e) => {
                          const newOptions = [...field.options];
                          newOptions[optionIndex] = {
                            ...option,
                            text: e.target.value,
                          };
                          setFormFields((prevFields) => {
                            const updatedFields = [...prevFields];
                            updatedFields[index].options = newOptions;
                            return updatedFields;
                          });
                        }}
                        className="input mx-3 p-2"
                      />
                      <input
                        type="text"
                        name={`option-value-${index}-${optionIndex}`}
                        placeholder="Option Value"
                        value={option.opvalue}
                        onChange={(e) => {
                          const newOptions = [...field.options];
                          newOptions[optionIndex] = {
                            ...option,
                            opvalue: e.target.value,
                          };
                          setFormFields((prevFields) => {
                            const updatedFields = [...prevFields];
                            updatedFields[index].options = newOptions;
                            return updatedFields;
                          });
                        }}
                        className="input mx-3 p-2"
                      />
                    </div>

                    <button
                      className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
                      onClick={() => removeOption(index, optionIndex)}
                    >
                      Remove Option
                    </button>
                  </div>
                ))}
                <button
                  className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
                  onClick={() => addOption(index)}
                >
                  Add Option
                </button>
              </>
            ) : null}
            {field.type === "select" ? (
              <>
                <select
                  name="value"
                  value={field.value}
                  onChange={(e) => handleFieldChange(index, e)}
                  className="input mx-3 p-2 w-36 m-4"
                >
                  {field.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.opvalue}>
                      {option.text}
                    </option>
                  ))}
                </select>
                {field.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-4"
                  >
                    <input
                      type="text"
                      name={`option-text-${index}-${optionIndex}`}
                      placeholder="Option"
                      value={option.text}
                      onChange={(e) => {
                        const newOptions = [...field.options];
                        newOptions[optionIndex] = {
                          ...option,
                          text: e.target.value,
                        };
                        setFormFields((prevFields) => {
                          const updatedFields = [...prevFields];
                          updatedFields[index].options = newOptions;
                          return updatedFields;
                        });
                      }}
                      className="input mx-3 p-2"
                    />
                    <input
                      type="text"
                      name={`option-value-${index}-${optionIndex}`}
                      placeholder="Option Value"
                      value={option.opvalue}
                      onChange={(e) => {
                        const newOptions = [...field.options];
                        newOptions[optionIndex] = {
                          ...option,
                          opvalue: e.target.value,
                        };
                        setFormFields((prevFields) => {
                          const updatedFields = [...prevFields];
                          updatedFields[index].options = newOptions;
                          return updatedFields;
                        });
                      }}
                      className="input mx-3 p-2"
                    />
                    <button
                      className="btn bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
                      onClick={() => removeOption(index, optionIndex)}
                    >
                      Remove Option
                    </button>
                  </div>
                ))}
                <button
                  className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
                  onClick={() => addOption(index)}
                >
                  Add Option
                </button>
              </>
            ) : null}
               <div className=" inline-flex items-center justify-center gap-5">
            <button
              className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
              onClick={() => removeField(index)}
            >
              Remove Field
            </button>
               <button className="bg-blue-950 p-2 rounded-lg hover:bg-blue-800 ml-4" onClick={()=>{moveElement('down',index)}}>
            <svg
              class="w-6 h-6 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1v12m0 0 4-4m-4 4L1 9"
              />
            </svg>
            </button>
            <button  className="bg-blue-950 p-2 rounded-lg hover:bg-blue-800 ml-4" onClick={()=>{moveElement('up',index)}}>
            <svg
              class="w-6 h-6 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
            </button>
               </div>
            
            {field.type !== "button" || field.type !== "header" ? (
              <>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="required"
                    id={index}
                    checked={field.required}
                    onChange={(e) => handleFieldChange(index, e)}
                    className="checkbox mx-3 p-2 size-5"
                  />
                  <label htmlFor={index}>Is Required</label>
                </div>
              </>
            ) : null}
          </div>
        ))}
        {formFields.length > 0 && (
          <>
            <button
              className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
              onClick={() => {
                setShow(true);
                setJsonDisplayed(false);
              }}
            >
              Preview Form
            </button>
            <button
              className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
              onClick={() => {
                setShow(true);
                setJsonDisplayed(true);
              }}
            >
              Check JSON
            </button>
          </>
        )}
      </div>
      {show && (
        <div className="shadow-lg inline-block px-4 bg-slate-200 fixed top-0 right-0 w-1/3 overflow-y-auto h-full">
          {" "}
          <DynamicForm
            formData={formFields}
            close={() => {
              setShow(false);
              setJsonDisplayed(false);
            }}
            displayJSON={jsondisplayed}
          />
        </div>
      )}
    </div>
  );
};

export default App;
