import React, { InputHTMLAttributes } from 'react';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

interface OwnProps {
  name: string
  label: string
  fieldState: TypeFieldState
  feedbackMessage?: string
}

type Props = OwnProps & InputHTMLAttributes<HTMLInputElement>


const TextField : React.FC<Props> = ({ name, label, fieldState='default', feedbackMessage, type:_type , ...props }) => {
  return <Label htmlFor={ name } labelText={ label }>
    <Input type={ 'text' } {...{fieldState, feedbackMessage, ...props }} />
  </Label>
}


export default TextField;