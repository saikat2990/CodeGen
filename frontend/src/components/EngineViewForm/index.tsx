import FormGenerator, { IField } from "./FormGenerator";

const fields: IField[] = [
  {
    type: "text",
    name: "username",
    label: "Username",
    placeholder: "Enter username",
    initialValue: "",
    col: 12,
  },
  {
    type: "text",
    name: "username",
    label: "Username",
    placeholder: "Enter username",
    initialValue: "",
    col: 6,
  },
  {
    type: "text",
    name: "username",
    label: "Username",
    placeholder: "Enter username",
    initialValue: "",
    col: 6,
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    initialValue: "",
    col: 12,
  },
];

function EngineViewForm() {
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="p-8 sm:pl-96">
      <FormGenerator
        fields={fields}
        onSubmit={onSubmit}
        defaultValues={{
          username: "johndoe",
          email: "john@example.com",
        }}
      />
    </div>
  );
}

export default EngineViewForm;
