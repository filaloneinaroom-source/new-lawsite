export default function SectionHead({ title, sub = "" }){
  return <div className="head"><h2>{title}</h2><p>{sub}</p></div>;
}
