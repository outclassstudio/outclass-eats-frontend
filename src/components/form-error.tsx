interface IFormErrorProps {
  errorMessage: string;
}

export default function FormError({ errorMessage }: IFormErrorProps) {
  return <span className="text-medium text-red-600">{errorMessage}</span>;
}
