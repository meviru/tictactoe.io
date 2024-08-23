const Block = ({ value, onClick }: any) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Block;
