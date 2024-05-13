import React, { useState } from "react";

const App = () => {
  const [formFields, setFormFields] = useState([]);

  const addField = (type) => {
    let field = { type: type, label: "", value: "", options: [] , inputType: "text"};
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
    const { name, value, type, checked} = event.target;
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      if (type === "checkbox") {
        updatedFields[index] = { ...updatedFields[index], [name]: checked};
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="flex justify-between mb-4">
          <button
            className="btn bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("textarea")}
          >
            Add Textarea
          </button>
          <button
            className="btn bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("checkbox")}
          >
            Add Checkbox
          </button>
          <button
            className="btn bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("text")}
          >
            Add Text Field
          </button>
          <button
            className="btn bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("radio")}
          >
            Add Radio Button
          </button>
          <button
            className="btn bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("select")}
          >
            Add Select Dropdown
          </button>
          <button
            className="btn bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("button")}
          >
            Add Button
          </button>
          <button
            className="btn bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("header")}
          >
            Add Header Text
          </button>
          <button
            className="btn bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("logo")}
          >
            Add LOGO
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
                 <select className="input px-4 py-2"  name='inputType' onChange={(e)=>{handleFieldChange(index,e)}} >
                  <option value='text'>Text</option>
                  <option value='email'>Email</option>
                  <option value='password'>Password</option>
                  <option value='number'>Number</option> 
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

            <button
              className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
              onClick={() => removeField(index)}
            >
              Remove Field
            </button>
          </div>
        ))}

        <button
          className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
          onClick={() => console.log(formFields)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default App;
