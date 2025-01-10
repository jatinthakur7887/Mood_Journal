const Quote = ({ text }) => {
  return (
    <div className="p-4 bg-yellow-100 rounded mb-4">
      <p className="italic">"{text}"</p>
    </div>
  );
};

export default Quote;
