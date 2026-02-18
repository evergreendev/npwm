const VerticalDivider = ({color,type,className}:{color:"highlight"|"dark",type:"thick"|"thin",className?:string}) => {

  return <div className={`max-h-full mx-2 ${type === "thick" ? "w-0.5" : "w-px"} ${color === "highlight" ? "bg-highlight" : "bg-text-secondary"}`+" "+className||""} />;
}

export default VerticalDivider;
