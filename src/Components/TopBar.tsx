import { Link } from 'react-router-dom';
import './topbar.css';

const TopBar = () => {
    return(
        <div className='topbar'>
            <div className='navigation'>
                {/* <Link className='navigation-widget' to="/coins">Coin Details</Link> */}
                <Link className='navigation-widget' to="/coins">Coins List</Link>
            </div>
            <h1 className='title'><Link className='navigation-widget' to="/">Mock Crypto Trader</Link></h1>
        </div>
    )
}

export default TopBar;