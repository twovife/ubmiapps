export default function InputLabel({
    value,
    className = "",
    children,
    optional = false,
    ...props
}) {
    return (
        <label
            {...props}
            className={`block font-medium text-sm text-gray-700  ` + className}
        >
            {value ? value : children}
            {optional ? (
                <span className="text-gray-400 italic">(optionals)</span>
            ) : (
                ""
            )}
        </label>
    );
}
