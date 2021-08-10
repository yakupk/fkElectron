import "./loading.css";

export default function Loading({ text = "Lütfen Bekleyiniz ..." }) {
  return (
    <div className="mini-loaders">
      <div className="box-mini loader-time" />
    </div>
  );
}
