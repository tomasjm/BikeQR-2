
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native"


interface ButtonProps extends TouchableOpacityProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
  return <TouchableOpacity
    className="bg-yellow-000-color items-center rounded-md border p-4 text-base text-white"
    {...props}
  >
    <Text>{text}</Text>
  </TouchableOpacity>
}

export default Button;
