import {ButtonProps} from "@material-ui/core/Button";
import {Button, CircularProgress} from "@material-ui/core";

interface LoadingButtonProps extends ButtonProps {
    loading: boolean;
    loadingSize?: string | undefined;
}

const LoadingButton = (props: LoadingButtonProps) => {
    const {loading, loadingSize, ...buttonProps} = props;

    return (
        <Button {...buttonProps} disabled={loading}>
            {loading &&
                <CircularProgress size={loadingSize || 25}/>
            }
            {!loading && props.children}
        </Button>
    );
}

export default LoadingButton;
