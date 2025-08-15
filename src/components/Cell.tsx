type CellProps = {
    value: string;
    onClick: () => void
};

export default function Cell({ value, onClick }: CellProps) {
    return (
        <div className={`cell ${value}`} onClick={onClick}>
            {value && <div className={`disc ${value}`} />}
        </div>
    )
}