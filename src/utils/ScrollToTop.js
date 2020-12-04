import {useEffect} from "react";
import {withRouter} from "react-router-dom";
/* eslint-disable */
function ScrollToTop({history}) {
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        };
    }, []);

    return null;
}
/* eslint-enable */
export default withRouter(ScrollToTop);
