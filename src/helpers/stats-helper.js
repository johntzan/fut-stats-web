import toPairs from 'lodash/toPairs';

export function getUserGamesWon(wl, type) {
    let userWins = 0;
    if (type === 'all') {
        userWins = getAllUserGamesWon(wl);
        return (userWins);
    } else if (type === 'current') {
        if (wl !== null) {

            wl.forEach(element => {
                console.log(element);
                if (element.userWon) {
                    userWins = userWins + 1;
                }
            });
            return (userWins);
        }
    }
    return (userWins);
}

function getAllUserGamesWon(wl) {
    return 0;
}

export function getGamesPlayedForAll(wl) {
    return 0;
}

export function getAvgStat(wl, stat, type) {
    let result = 0;
    if (type === 'all') {
        result = getAvgStatForAll(wl, stat);
        return result;
    } else if (type === 'current') {
        wl.forEach(element => {
            result += Number(element[stat]);
        });
        return round((result / wl.length));
    }
    return result;
}

export function getAvgStatForAll(wl, stat) {
    //TODO: implement iteration for all wls.
    return 0;
}

export function getTotalsStat(wl, stat, type) {
    let result = 0;
    if (type === 'all') {
        result = getTotalStatsForAll(wl, stat);
        return result;
    } else if (type === 'current') {
        if (wl !== null) {

            wl.forEach(element => {
                result += Number(element[stat]);
            });
            return (result);
        }
    }
    return result;
}

export function getTotalStatsForAll(wl, stat) {
    //TODO: implement iteration for all wls.
    return 0;
}

export function getAvgPossession(wl, stat, type) {
    let result = 0;
    if (type === 'all') {
        result = getAvgPossessionForAll(wl, stat);
        return result;
    } else if (type === 'current') {
        if (wl !== null) {
            wl.forEach(element => {
                result += Number(element[stat]);
            });
            return (Math.round((result / wl.length) * 100) / 100);
        }
    }
    return 0;
}

export function getAvgPossessionForAll(wl, stat) {
    //TODO: implement iteration for all wls.
    return 0;
}

export function getUserAvgGoalPerShot(wl, type) {

    let userGoals = getAvgStat(wl, 'userGoals', type);
    let userShotsOnGoal = getAvgStat(wl, 'userShotsOnGoal', type);

    return round((userGoals / userShotsOnGoal));
}

export function getOppAvgGoalPerShot(wl, type) {

    let oppGoals = getAvgStat(wl, 'oppGoals', type);
    let oppShotsOnGoal = getAvgStat(wl, 'oppShotsOnGoal', type);

    return round((oppGoals / oppShotsOnGoal));
}

export function getPenaltiesCount(wl, type) {
    let count = 0;
    if (type === 'all') {
        count = getPenaltiesCountForAll(wl);
        return (count);
    } else if (type === 'current') {

        wl.forEach(element => {
            if (element.userGoals === element.oppGoals) {
                count += 1;
            }
        });
    }
    return (count);
}

function getPenaltiesCountForAll(wl) {
    return 0;
}

export function getPenaltiesLostCount(wl, type) {
    let count = 0;

    if (type === 'all') {
        count = getPenaltiesLostCountForAll(wl);
        return (count);
    } else if (type === 'current') {

        wl.forEach(element => {
            if (element.userGoals === element.oppGoals) {
                if (element.userPenScore < element.oppPenScore) {
                    count += 1;
                }
            }
        });
    }
    return (count);
}

function getPenaltiesLostCountForAll(wl) {
    return 0;
}

export function getCountOfStat(wl, stat, type) {
    let count = 0;
    if (type === 'all') {
        count = getCountOfStatForAll(wl, stat);
        return (count);
    } else if (type === 'current') {

        wl.forEach(element => {
            if (element[stat]) {
                count += 1;
            }
        });
    }
    return (count);
}

function getCountOfStatForAll(wl, stat) {
    return 0;
}

export function getTop5Formation(wl, type) {

    let counts = {};
    let result = [];

    if (type === 'all') {
        result = getTop5FormationsForAll(wl);
        return (result);
    } else if (type === 'current') {

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

        result = arr
            .slice(0, 4)
            .map(function (x, index) {
                return {Formation: x[0], Count: x[1]};

            });

        console.log(result);
    }

    return result;

}

function getTop5FormationsForAll(wl) {
    return [];
}

export function getTop5SquadTypes(wl, type) {
    let counts = {};
    let result = [];

    if (type === 'all') {
        result = getTop5SquadTypeForAll(wl);
        return (result);
    } else if (type === 'current') {

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

        result = arr
            .slice(0, 4)
            .map(function (x, index) {
                return {Squad: x[0], Count: x[1]};

            });
    }

    return (result);
}

function getTop5SquadTypeForAll(wl) {
    return [];
}

function round(number) {
    return (Math.round(number * 100) / 100).toFixed(2);
}