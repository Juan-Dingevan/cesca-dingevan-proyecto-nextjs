interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
  }
  
  export function Button({ children, className, ...rest }: ButtonProps) {
    return (
      <button
        {...rest}
        
        className="text-white text-base bg-lime-600 hover:bg-lime-500 focus:ring-2 focus:outline-none focus:ring-lime-300 rounded-lg px-4 py-2 text-center hover:transition-colors ease-in-out duration-500"
        >
      
        {children}
      </button>
    );
  }