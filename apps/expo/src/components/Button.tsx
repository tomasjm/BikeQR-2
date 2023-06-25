import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
  return (
    <TouchableOpacity
      className="bg-yellow-000-color items-center rounded-md border border-yellow-400 p-4 py-3 text-base"
      {...props}
    >
      <Text className="text-black">{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
