chrome.action.onClicked.addListener((tab) => {
    console.log(tab);
});

// const getNumber = require('./nb')

// chrome.tabs.getSelected(null,function(tab) {
//     var tablink = tab.url;
//     console.log(tablink);
// });


// chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//     let url = tabs[0].url;
//     console.log(url);
//     // use `url` here inside the callback because it's asynchronous!
// });

// chrome.runtime.onInstalled.addListener(() => {

// });

// // Listen for the 'activated' event to know when the extension has loaded
// chrome.runtime.onInstalled.addListener(function() {
//     // Register a listener for the 'tabs.onActivated' event
//     chrome.tabs.onActivated.addListener(function(activeInfo) {
//       // Get the current tab's details
//       chrome.tabs.get(activeInfo.tabId, function(tab) {
//         // Log a message to the console with the new tab's URL
//         console.log("New tab activated:", tab.url);
//       });
//     });
//   });


// Listen for the 'activated' event to know when the extension has loaded
chrome.runtime.onInstalled.addListener(function () {
    chrome.action.setBadgeText({
        text: "Wait...",
    });
    // chrome.action.setBadgeBackgroundColor({
    //     color: [255, 0, 0, 255] // Set the color to green
    // });
    // Register a listener for the 'tabs.onUpdated' event
    chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
        // Only log a message if the URL has changed
        if (changeInfo.url) {
            console.log("Hi");
            // .then((res) => res.json())
            // .then((ans) => {
            //     console.log(ans);
            //     if (ans.prediction === "phishing") {
            //         chrome.action.setBadgeText({
            //             text: "Risk",
            //         });
            //         chrome.action.setBadgeBackgroundColor({
            //             color: [255, 0, 0, 255] // Set the color to red
            //         });
            //     }
            //     else {
            //         chrome.action.setBadgeText({
            //             text: "Safe",
            //         });
            //         chrome.action.setBadgeBackgroundColor({
            //             color: [0, 128, 0, 255] // Set the color to green
            //         });
            //     }
            // });

            // await chrome.browserAction.openPopup();

            // Getting the URL
            const uniformRL = changeInfo.url;

            //Creating a new URL object and getting IP address
            const urlObject = new URL(uniformRL);
            let ipAddress = urlObject.hostname;
            const hostname = urlObject.hostname
            
            
            // Manipulating it
            const URLSplitArray = uniformRL.split('/');
            const URLSplitHost = uniformRL.split('.')
            
            
            
            
            
            const http_in_path = (uniformRL.includes('http') ? 0 : 1);
            const https_token = (uniformRL.includes('https') ? 0 : 1);
            const nb_www = (uniformRL.includes('www') ? 0 : 1);
            const nb_com = (uniformRL.includes('.com') ? 0 : 1);
            
            
            // const ratio_digits_url = 0;
            // const ratio_digits_host = 0;
            let noOfDigitsInTheUrl = 0;
            let noOfCharactersInTheUrl = 0;
            let noOfDigitsInTheHostname = 0;
            let noOfCharactersInTheHostname = 0;
            
            
            
            //getting the numbers
            const lookupTable = { ".": 0, "-": 0, "@": 0, "?": 0, "&": 0, "=": 0, "_": 0, "~": 0, "%": 0, "/": 0, ":": 0, ",": 0, ";": 0, "$": 0, " ": 0, "//": 0};
            
            
            for (let i = 0; i < uniformRL.length; i++) {
                const char = uniformRL[i];
                if (lookupTable[char] != undefined) {
                    lookupTable[char]++;
                }
                if(((char.charCodeAt(0) - 48) >= 0) && ((char.charCodeAt(0) - 48) <= 9)) {
                    // console.log(char.charCodeAt(0) - 48);
                    noOfDigitsInTheUrl++;
                }
                else {
                    noOfCharactersInTheUrl++;
                }
            }
            const ratio_digits_url = parseFloat(noOfDigitsInTheUrl/noOfCharactersInTheUrl);


            for (let i = 0; i < hostname.length; i++) {
                const char = hostname[i];
                const theDigit = (char.charCodeAt(0) - 48);
                if (theDigit >= 0 && theDigit <= 9) {
                    noOfDigitsInTheHostname++;
                }
                else {
                    noOfCharactersInTheHostname++;
                }
            }
            const ratio_digits_hostname = parseFloat(noOfDigitsInTheHostname/noOfCharactersInTheHostname);


            
            const numberOf = [
                { name: 'nb_dot', value: lookupTable['.'] },
                { name: 'nb_hyphen', value: lookupTable['-'] },
                { name: 'nb_at', value: lookupTable['@'] },
                { name: 'nb_qm', value: lookupTable['?'] },
                { name: 'nb_and', value: lookupTable['&'] },
                { name: 'nb_eq', value: lookupTable['='] },
                { name: 'nb_underscore', value: lookupTable['_'] },
                { name: 'nb_tilde', value: lookupTable['~'] },
                { name: 'nb_percent', value: lookupTable['%'] },
                { name: 'nb_slash', value: lookupTable['/'] },
                { name: 'nb_colon', value: lookupTable[':'] },
                { name: 'nb_comma', value: lookupTable[','] },
                { name: 'nb_semicolumn', value: lookupTable[';'] },
                { name: 'nb_dollar', value: lookupTable['$'] },
                { name: 'nb_space', value: lookupTable[' '] },
                { name: 'nb_dslash', value: lookupTable['//'] }
            ];

            
            
            
            
            
            
            
            // Defining the final features
            const length_url = uniformRL.length;
            const length_hostname = URLSplitArray[2];


            //checking the number of subdomains in url
            const nb_subdomain = urlObject.hostname.split('.').length - 2;

            

            const hostnamee = URLSplitHost[2];
            
            
            console.log(length_url);
            console.log("New URL loaded:", uniformRL);
            console.log("Length: ", length_url);
            console.log("Length of hostname", length_hostname.length);
            
            

            // const url = new URL('https://example.com');
            
            //checking for ipAdress
            if (/^\d+\.\d+\.\d+\.\d+$/.test(urlObject.hostname)) {
                ipAddress = 1;
            } else {
                ipAddress = 0;
            }
            
            //checking for tld in url
            const tldRegex = /\.com|\.net|\.org|\.edu|\.gov/i;
            const hasTldInPath = tldRegex.test(urlObject.hostname);
            const hasTldInSb = tldRegex.test(urlObject.hostname);

            console.log("ip: ", ipAddress) //doesnt work properly
            console.log(numberOf); //done
            console.log("http_in_path: ", http_in_path,"http_token: ", https_token, "nb_www: ", nb_www, "nb_com: ", nb_com) //done
            console.log("hostname: ", hostname)//doesnt work properly
            console.log("Ratio_digits_url: ", ratio_digits_url);
            console.log("Ratio_digits_hostname: ", ratio_digits_hostname);
            console.log("port: ", urlObject.port)//doesnt work properly
            
            console.log("tld_in_path: ", hasTldInPath);
            console.log("tld_in_subdomain: ", hasTldInSb);
            console.log("nb_subdomain: ", nb_subdomain);








            const response = await fetch('https://phishing-detection.onrender.com/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({ input: [ length_url, length_hostname.length, ipAddress, numberOf[0].value, numberOf[1].value, numberOf[2].value, numberOf[3].value, numberOf[4].value, numberOf[5].value, numberOf[6].value, numberOf[7].value, numberOf[8].value, numberOf[9].value, numberOf[10].value, numberOf[11].value, numberOf[12].value, numberOf[13].value, numberOf[14].value, nb_www, nb_com, numberOf[15].value, http_in_path, https_token, ratio_digits_url, ratio_digits_hostname, (urlObject.port ? 1 : 0), hasTldInPath, hasTldInSb ,nb_subdomain ] })

                // body: JSON.stringify({ input: [77.0, 23.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 5.0, 1.0, 0.0, 0.0, 0.0] })
            });

            const json = await response.json();
            console.log(json);

            if (json.prediction === "legitimate") {
                chrome.action.setBadgeText({
                    text: "Safe",
                });
                chrome.action.setBadgeBackgroundColor({
                    color: [0, 128, 0, 255] // Set the color to green
                });
            }
            else {
                chrome.action.setBadgeText({
                    text: "Risk",
                });
                chrome.action.setBadgeBackgroundColor({
                    color: [255, 0, 0, 255] // Set the color to green
                });
            }






        }
    });
});

// ['length_url', 'length_hostname', 'ip', 'nb_dots', 'nb_hyphens', 'nb_at',
//        'nb_qm', 'nb_and', 'nb_eq', 'nb_underscore', 'nb_tilde', 'nb_percent',
//        'nb_slash', 'nb_colon', 'nb_comma', 'nb_semicolumn', 'nb_dollar',
//        'nb_space', 'nb_www', 'nb_com', 'nb_dslash', 'http_in_path',
//        'https_token', 'ratio_digits_url', 'ratio_digits_host', 'port',
//        'tld_in_path', 'tld_in_subdomain', 'nb_subdomains', 'prefix_suffix',
//        'random_domain', 'shortening_service', 'path_extension',
//        'nb_redirection', 'nb_external_redirection', 'length_words_raw',
//        'char_repeat', 'shortest_words_raw', 'shortest_word_host',
//        'shortest_word_path', 'longest_words_raw', 'longest_word_host',
//        'longest_word_path', 'avg_words_raw', 'avg_word_host', 'avg_word_path',
//        'phish_hints', 'domain_in_brand', 'suspecious_tld',
//        'statistical_report', 'nb_hyperlinks', 'ratio_intHyperlinks',
//        'ratio_extHyperlinks', 'nb_extCSS', 'ratio_extRedirection',
//        'ratio_extErrors', 'login_form', 'external_favicon', 'links_in_tags',
//        'ratio_intMedia', 'ratio_extMedia', 'iframe', 'popup_window',
//        'safe_anchor', 'onmouseover', 'right_clic', 'empty_title',
//        'domain_in_title', 'domain_with_copyright', 'whois_registered_domain',
//        'domain_registration_length', 'domain_age', 'web_traffic', 'dns_record',
//        'google_index', 'page_rank']