import './sound.css'
function Sound() {
  return (
      <div className="unmuted toggle-sound" href="#">
        <div className="tooltip--left sound" data-tooltip="Sesi Aç/Kapat">
          <div className="sound--icon fa fa-volume-off" />
          <div className="sound--wave sound--wave_one" />
          <div className="sound--wave sound--wave_two" />
          <div className="sound--wave sound--wave_three" />
        </div>
      </div>
  );
}

export default Sound;
