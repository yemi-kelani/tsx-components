import { CenterDisplay } from '../StoryUtils/CenterDisplay';
import { ImagePlaceholder } from './ImagePlaceholder/ImagePlaceholder';
import { LoadingPlaceholder } from './LoadingPlaceholder/LoadingPlaceholder';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleNotch, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export const World = () => {
  return (
    <CenterDisplay direction="row">
      <CenterDisplay>
        <ImagePlaceholder iconSize="1x" size="small" />
        <ImagePlaceholder iconSize="2x" size="medium" />
        <ImagePlaceholder animate={false} iconSize="4x" size="large" />
      </CenterDisplay>

      <CenterDisplay>
        <LoadingPlaceholder animate={false} size="large" />
        <LoadingPlaceholder size="small" />
        <LoadingPlaceholder size="medium" />
      </CenterDisplay>

      <CenterDisplay>
        <ImagePlaceholder iconSize="3x" size="medium" />
        <ImagePlaceholder iconSize="1x" size="large" />
        <ImagePlaceholder iconSize="2x" size="small" />
      </CenterDisplay>
    </CenterDisplay>
  );
};
