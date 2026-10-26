import { useState } from "react";

// Заглушка «СМ»; если картинка не загрузилась — остаётся только заглушка
export default function Photo({ src }){
  const [ok, setOk] = useState(true);
  return (
    <div className="photo">
      <span>СМ</span>
      {src && ok && <img src={src} alt="" onError={() => setOk(false)} />}
    </div>
  );
}
