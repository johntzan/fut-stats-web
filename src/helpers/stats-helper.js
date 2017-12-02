import toPairs from 'lodash/toPairs';

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
    return round((userAvgGoals / wl.length));
}

export function getOppAvgGoals(wl) {
    let oppAvgGoals = 0;
    wl.forEach(element => {
        oppAvgGoals += Number(element.oppGoals);
    });
    return round((oppAvgGoals / wl.length));
}

export function getUserAvgShots(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.userShots);
    });
    return round((result / wl.length));
}

export function getOppAvgShots(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.oppShots);
    });
    return round((result / wl.length));
}

export function getUserAvgShotsOnGoal(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.userShotsOnGoal);
    });
    return round((result / wl.length));
}

export function getOppAvgShotsOnGoal(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.oppShotsOnGoal);
    });
    return round((result / wl.length));
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
    return (Math.round((result / wl.length) * 100) / 100);
}

export function getOppAvgPossession(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.oppPossession);
    });
    return (Math.round((result / wl.length) * 100) / 100);
}

export function getUserAvgGoalPerShot(wl) {

    let userGoals = getUserAvgGoals(wl);
    let userShotsOnGoal = getUserAvgShotsOnGoal(wl);

    return round((userGoals / userShotsOnGoal));
}

export function getOppAvgGoalPerShot(wl) {

    let oppGoals = getOppAvgGoals(wl);
    let oppShotsOnGoal = getOppAvgShotsOnGoal(wl);

    return round((oppGoals / oppShotsOnGoal));
}

export function getUserAvgPassAccuracy(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.userPassAccuracy);
    });
    return round((result / wl.length));
}

export function getOppAvgPassAccuracy(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.oppPassAccuracy);
    });
    return round((result / wl.length));
}

export function getUserAvgTackles(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.userTackles);
    });
    return round((result / wl.length));
}

export function getOppAvgTackles(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.oppTackles);
    });
    return round((result / wl.length));
}

export function getUserAvgCorners(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.userCorners);
    });
    return round((result / wl.length));
}

export function getOppAvgCorners(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.oppCorners);
    });
    return round((result / wl.length));
}

export function getPenaltiesCount(wl) {
    let count = 0;
    wl.forEach(element => {
        if (element.userGoals === element.oppGoals) {
            count += 1;
        }
    });
    return (count);
}

export function getDisconnectsCount(wl) {
    let count = 0;
    wl.forEach(element => {
        if (element.disconnectedFromEA) {
            count += 1;
        }
    });
    return (count);
}

export function getRageQuitCount(wl) {
    let count = 0;
    wl.forEach(element => {
        if (element.rageQuitChecked) {
            count += 1;
        }
    });
    return (count);
}

export function getPenaltiesLostCount(wl) {
    let count = 0;
    wl.forEach(element => {
        if (element.userGoals === element.oppGoals) {
            if (element.userPenScore < element.oppPenScore) {
                count += 1;
            }
        }
    });
    return (count);
}

export function getOppAvgTeamRating(wl) {
    let result = 0;
    wl.forEach(element => {
        result += Number(element.oppTeamRating);
    });
    return round((result / wl.length));
}

export function getTop5Formation(wl) {

    let counts = {};
    wl.forEach(element => {
        //checks if counts object contains element already, if so, +1, else = 1
        counts[element.oppFormationSelected] = counts[element.oppFormationSelected]
            ? counts[element.oppFormationSelected] + 1
            : 1;
    });

    let arr = toPairs(counts);
    // sort in descending order by count
    arr = arr.sort(function (a, b) {
        return b[1] - a[1];
    });

    let result = arr
        .slice(0, 4)
        .map(function (x, index) {
            return {Formation: x[0], Count: x[1]};

        });

    console.log(result)

    return (result);

}

export function getTop5SquadTypes(wl) {
    let counts = {};
    wl.forEach(element => {
        element
            .oppSquad
            .forEach(squad => {
                counts[squad] = counts[squad]
                    ? counts[squad] + 1
                    : 1;
            });
    });
    let arr = toPairs(counts);
    // sort in descending order by count
    arr = arr.sort(function (a, b) {
        return b[1] - a[1];
    });

    let result = arr
        .slice(0, 4)
        .map(function (x, index) {
            return {Squad: x[0], Count: x[1]};

        });

    return (result);
}

function round(number) {
    return (Math.round(number * 100) / 100).toFixed(2);
}