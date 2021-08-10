import { Input } from "antd";
import cn from "classnames";
import { InstitutionForm } from "..";

function InstitutionFormBuild({
  inputs,
  type,
  activeInputIndex,
  setActiveInput,
  num,
}) {
  return (
    <InstitutionForm type={type}>
      {inputs.map((input, index) => (
        <InputItem
          key={index}
          click={() => setActiveInput(index + 1)}
          {...input}
          num={num[index + 1]}
          className={cn(activeInputIndex === index + 1 && "active")}
        />
      ))}
    </InstitutionForm>
  );
}

function InputItem({ label, min, max, name, num, click, ...props }) {
  return (
    <fieldset onClick={click} className={props.className} id="QueryForm">
      <legend>{label}</legend>
      <Input
        type="text"
        name={name}
        value={num}
        minLength={min}
        maxLength={max}
        onChange={(e) => console.log('input change: ', e)}
        autoComplete="off"
        autoFocus={true}
      />
    </fieldset>
  );
}

export default InstitutionFormBuild;
