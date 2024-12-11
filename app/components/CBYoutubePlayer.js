import React, {forwardRef, useEffect, useState} from 'react';
import {Image} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const CBYoutubePlayer = (props, ref) => {
    const [height, setHeight] = useState(0);
    useEffect(() => {
        const {source, width: w, height: h} = props;
        if (source && typeof source === 'number') {
            const {width, height} = Image.resolveAssetSource(source);
            setHeight(height * (w / width));
        } else if (source && typeof source === 'object') {
            if (source.uri && source.uri.indexOf('base64') > -1) {
                Image.getSize(source.uri, (width, height) => setHeight(height * (w/ width)), () => setHeight(h));
            } else {
                fetch(source.uri).then((response) => {
                    Image.getSize(source.uri, (width, height) => setHeight(height * (w / width)), () => setHeight(h));
                }).catch((error) => setHeight(h));
            }
        } else {
            setHeight(h);
        }
    }, []);
    return (
        <YoutubePlayer ref={ref} {...props} height={height}/>
    );
};

export default forwardRef(CBYoutubePlayer);

