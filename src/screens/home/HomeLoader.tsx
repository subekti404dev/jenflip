import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {Gap, Padder, utils} from 'urip-rn-kit';
const _ = utils._;

export const WelcomeLoader = (props: any) => {
  const width = utils.sizeMatters.scale(props.width || 340);
  const height = (45 / 340) * width;
  if (props.show) {
    return (
      <ContentLoader
        speed={2}
        width={width}
        height={height}
        viewBox="0 0 340 45"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect x="0" y="0" rx="5" ry="5" width="67" height="11" />
        <Rect x="1" y="19" rx="5" ry="5" width="132" height="16" />
      </ContentLoader>
    );
  } else {
    return props.children;
  }
};

export const CardLoader = (props: any) => {
  const width = utils.sizeMatters.scale(props.width || 364);
  const height = (150 / 364) * width;
  if (props.show) {
    return (
      <Padder top>
        <ContentLoader
          speed={2}
          width={width}
          height={height}
          viewBox="0 0 364 150"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <Rect x="17" y="1" rx="16" ry="16" width="256" height="143" />
        </ContentLoader>
      </Padder>
    );
  } else {
    return props.children;
  }
};

export const HistoryLoader = (props: any) => {
  const width = utils.sizeMatters.scale(props.width || 320);
  const height = (50 / 364) * width;
  const Loader = () => (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox="0 0 364 50"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <Rect x="10" y="3" rx="10" ry="10" width="47" height="44" />
      <Rect x="65" y="9" rx="7" ry="7" width="147" height="14" />
      <Rect x="66" y="29" rx="5" ry="5" width="114" height="11" />
      <Rect x="278" y="12" rx="9" ry="9" width="84" height="17" />
    </ContentLoader>
  );
  if (props.show) {
    return (
      <>
        <Gap vertical />
        <Loader />
        <Gap vertical />
        <Loader />
        <Gap vertical />
        <Loader />
        <Gap vertical />
        <Loader />
        <Gap vertical />
        <Loader />
        <Gap vertical />
        <Loader />
      </>
    );
  } else {
    return props.children;
  }
};

export const QuickLoader = (props: any) => {
  const width = utils.sizeMatters.scale(props.width || 320);
  const height = (60 / 225) * width;
  if (props.show) {
    return (
      <ContentLoader
        speed={2}
        width={width}
        height={height}
        viewBox="0 0 255 60"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect x="135" y="5" rx="15" ry="15" width="50" height="50" />
        <Rect x="200" y="5" rx="15" ry="15" width="50" height="50" />
        <Rect x="5" y="5" rx="15" ry="15" width="50" height="50" />
        <Rect x="70" y="5" rx="15" ry="15" width="50" height="50" />
      </ContentLoader>
    );
  } else {
    return props.children;
  }
};

export const TitleLoader = (props: any) => {
  const width = utils.sizeMatters.scale(props.width || 225);
  const height = (30 / 225) * width;
  if (props.show) {
    return (
      <ContentLoader
        speed={2}
        width={width}
        height={height}
        viewBox="0 0 255 30"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <Rect x="8" y="3" rx="10" ry="10" width="167" height="23" />
      </ContentLoader>
    );
  }
  return props.children;
};
