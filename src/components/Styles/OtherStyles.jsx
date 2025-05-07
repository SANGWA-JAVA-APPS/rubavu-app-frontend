
import React from "react"
import GifLoader from 'react-gif-loader';
class OtherStyles {

    iconStyles() {
        return {
            color: "#fdefe3e8",
            marginRight: "5px"
        }
    }
   
    txt() {
        return {
            border: "1px solid #8fa6d3da",
            borderRadius: "3px",
            fontWeight: "bolder",
            color: "#000",
            margin: "0px auto",
            padding: "0px auto",
            height: "32px",
            fontSize: "14px"
        }
    }
    DateOnPrint() {
        return <>
            <div className="row d-flex justify-content-start">
                <div className="col" style={{ fontWeight: "bolder" }}>
                    Date:
                </div>
                <div className="col">
                    {new Date().getFullYear()
                        + "-" + (new Date().getMonth() + 1)
                        + "-" + new Date().getDate() + " " +
                        new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}
                </div>
            </div>
        </>
    }

    bg() {
        return '#0b3059'
    }
    lightBg(){
        return '#eb6600e8'
    }
    thead() {
        return {
            backgroundColor: this.bg,
            color: '#ffffff',
            textTransform: 'uppercase',
            fontSize: '12px',
        }
    }
    
    LogoOnPrint() {
        return {
            height: "70px",
            backgroundSize: "100%"
        }
    }
    
}
export default new OtherStyles()

export const LoadingGif = () => {

    const imageStyle={
        height: '40px',
        width: '100px',
        backgroundImage: '100%',
        position: 'absolute',
        left:'-30px'
    }
    return (
        <GifLoader
            loading={true}
            imageSrc="https://media.giphy.com/media/l378zKVk7Eh3yHoJi/source.gif"
            imageStyle={imageStyle}
            overlayBackground="#fff"
        />
    );
}