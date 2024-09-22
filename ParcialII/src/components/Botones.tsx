import "bootstrap/dist/css/bootstrap.min.css";

interface ButtonProps {
  texto: string;
  onClick?: () => void;
}

const Botones: React.FC<ButtonProps> = ({ texto, onClick }) => {
  return (
    <button type="button" className="btn btn-primary me-2" onClick={onClick}>
      {texto}
    </button>
  );
};

export default Botones;
