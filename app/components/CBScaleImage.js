import React, {forwardRef, useEffect, useState} from 'react';
import {Image as RNImage} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Image} from 'react-native-elements';

const CBScaleImage = (props, ref) => {
    const [height, setHeight] = useState(0);
    useEffect(() => {
        const {source, width: w, height: h} = props;
        if (source && typeof source === 'number') {
            const {width, height} = RNImage.resolveAssetSource(source);
            setHeight(height * (w / width));
        } else if (source && typeof source === 'object') {
            if (source.uri && source.uri.indexOf('base64') > -1) {
                RNImage.getSize(source.uri, (width, height) => setHeight(height * (w/ width)), () => setHeight(h));
            } else {
                fetch(source.uri).then((response) => {
                    RNImage.getSize(source.uri, (width, height) => setHeight(height * (w / width)), () => setHeight(h));
                }).catch((error) => setHeight(h));
            }
        } else {
            setHeight(h);
        }
    }, []);
    return (
        props.fasted ? <FastImage ref={ref} {...props} style={{...props.containerStyle, width: props.width, height: height}}/>
            : <Image ref={ref} {...props} containerStyle={{...props.containerStyle, width: props.width, height: height}}/>
    );
};

export default forwardRef(CBScaleImage);

