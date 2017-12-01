export function getUserGamesWon(weekendLeague) {
    console.log('getUserGamesWon');
    let userWins = 0;
    weekendLeague.forEach(element => {
        console.log(element);
        if (element.userWon) {
            userWins = userWins + 1;
        }
    });
    return (userWins);
}

export function getUserAvgGoals(wl) {
    let userAvgGoals = 0;
    wl.forEach(element => {
        userAvgGoals += Number(element.userGoals);
    });
    return (userAvgGoals / wl.length);
}

export function getOppAvgGoals(wl) {
    let oppAvgGoals = 0;
    wl.forEach(element => {
        oppAvgGoals += Number(element.oppGoals);
    });
    return (oppAvgGoals / wl.length);
}

export function getUserAvgShots(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.userShots);
    });
    return (result / wl.length);
}

export function getOppAvgShots(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.oppShots);
    });
    return (result / wl.length);
}

export function getUserAvgShotsOnGoal(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.userShotsOnGoal);
    });
    return (result / wl.length);
}

export function getOppAvgShotsOnGoal(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.oppShotsOnGoal);
    });
    return (result / wl.length);
}

export function getUserTotalGoals(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.userGoals);
    });
    return (result);
}

export function getOppTotalGoals(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.oppGoals);
    });
    return (result);
}

export function getUserAvgPossession(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.userPossession);
    });
    return (result / wl.length);
}

export function getOppAvgPossession(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.oppPossession);
    });
    return (result / wl.length);
}
