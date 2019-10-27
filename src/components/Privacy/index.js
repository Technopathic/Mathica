import React from 'react';

import Style from './style.js';

class Privacy extends React.PureComponent {
    render() {
        return(
            <div className={Style.detailContainer}>
                <div className={Style.infoImportant}>Privacy Policy and Cookie Statement</div>
                <p>Mathica is operated and maintained by @Technopathic. This document outlines the data handling practices for this website.</p>
    
                <div className={Style.infoImportant}>What personal data do you collect?</div>
                <p>For analytics purposes, anonymous and aggregated data may be collected, using Google Analytics. This data includes:</p>
                <ul>
                    <li><span>Technical Data:</span> Contextual information about your client system including hardware and browser specifications.</li>
                    <li><span>Navigational Information:</span> Time spent on the website.</li>
                    <li><span>Usage Information:</span> Analytics tied to your use of website features, such as when you start, win, or lose a game.</li>
                </ul>
    
                <p>For more information on how Google Analytics uses this data see:</p>
                <ul>
                    <li><a href="https://policies.google.com/technologies/partner-sites" className={Style.infoLink}>Google's Partner Site Policy</a></li>
                </ul>
    
                <div className={Style.infoImportant}>Are cookies stored on my device? How are they used?</div>
                <p>We use your browser's local storage features to locally store information about the game's state. This lets us save your game at any point and allo you to pick it back up from where you left off. This data is kept in your browser and never sent to servers operated by us or a third-party. no personally-identifiable information is included.</p>
                <p>This website uses Google Analytics. For information on Google Analytics Cookie Policy see: </p>
                <p>If you have any questions, feel free to email hey@technopathic.me</p>
            </div>
        )
    }
}

export default Privacy;