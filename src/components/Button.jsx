
const Button = ({ label, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition transform hover:-translate-y-0.5"
    >
      {label}
    </button>
  )
}

export default Button
