import './LoadingSpin.scss';
const LoadingSpin = ({ className }: any) => {
    return (
        <div className={`LoadingSpin-components flex justify-center items-center w-full py-10 ${className}`}>
            <span className="loader"></span>
        </div>
    );
};

export default LoadingSpin;
