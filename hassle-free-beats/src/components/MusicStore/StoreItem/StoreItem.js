import React from "react";
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";

export default ({
  track,
  playlist,
  activeMusicIndex,
  cart,
  handleSelect,
  handleAddToCart,
  mobile
}) => {
  const { title, artist } = track;
  return (
    <div key={title}>
      <div
      data-track={playlist.indexOf(track)}
        className="store-item"
        onClick={() => handleSelect(playlist.indexOf(track))}
        style={{
          backgroundColor:
            activeMusicIndex === playlist.indexOf(track) && "#cccccc"
        }}
      >
        <div className="store-item-left">
          <p className="track-title">{title}</p>
          <p className="track-genre">{artist}</p>
        </div>
        <div className="store-item-right">
          {
            // <span className="struck">$50.00  {"  "}</span>
          }
          <span>$10.00</span>
          <IconButton
            iconClassName={
              cart.indexOf(track.title) === -1
                ? "fa fa-plus-square"
                : "fa fa-minus-square"
            }
            iconStyle={
              cart.indexOf(track.title) === -1
                ? {
                    color: "#96031A",
                    iconHoverColor: "#faa916"
                  }
                : { color: "#faa916" }
            }
            tooltip={
              cart.indexOf(track.title) === -1
                ? !mobile && "Add To Cart"
                : !mobile && "Remove From Cart"
            }
            touch={true}
            tooltipPosition="bottom-left"
            onClick={e => handleAddToCart(track.title, e)}
          />
        </div>
      </div>
      <Divider />
    </div>
  );
};
