import toPairs from 'lodash/toPairs';

export function getUserGamesWon(wl, type) {
    let userWins = 0;
    if (type === 'all') {
        userWins = getAllUserGamesWon(wl);
        return (userWins);
    } else if (type === 'current') {
        if (wl !== null) {

            wl.forEach(element => {
                // console.log(element);
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
    let userWins = 0;
    wl.forEach(data => {
        let weekendLeague = data.weekendLeague;
        weekendLeague.forEach(element => {
            if (element.userWon) {
                userWins += 1;
            }
        });
    });

    return userWins;
}

export function getGamesPlayedForAll(wl) {
    let gamesPlayed = 0;
    wl.forEach(data => {
        let weekendLeague = data.weekendLeague;
        gamesPlayed += weekendLeague.length;
    });

    return (gamesPlayed);
}

export function getAvgStat(wl, stat, type) {
    let result = 0;
    if (type === 'all') {
        result = getAvgStatForAll(wl, stat);
        return result;
    } else if (type === 'current') {
        wl.forEach(element => {
            if (!element.disconnectedFromEA) {
                result += Number(element[stat]);
            }
        });
        return round((result / getWeekendLeagueLength(wl)));
    }
    return result;
}

export function getAvgStatForAll(wl, stat) {
    let result = 0;
    wl.forEach(data => {
        let weekendLeague = data.weekendLeague;
        weekendLeague.forEach(element => {
            if (!element.disconnectedFromEA) {
                result += Number(element[stat]);
            }
        });
    });
    return round((result / getAllWeekendLeagueLength(wl)));
}

export function getTotalsStat(wl, stat, type) {
    let result = 0;
    if (type === 'all') {
        result = getTotalStatsForAll(wl, stat);
        return (result);
    } else if (type === 'current') {
        if (wl !== null) {

            wl.forEach(element => {
                if (!element.disconnectedFromEA) {
                    result += Number(element[stat]);
                }
            });
            return (result);
        }
    }
    return result;
}

export function getTotalStatsForAll(wl, stat) {
    let result = 0;
    wl.forEach(data => {
        let weekendLeague = data.weekendLeague;
        weekendLeague.forEach(element => {
            if (!element.disconnectedFromEA) {
                result += Number(element[stat]);
            }
        });
    });
    return (result);
}

export function getAvgPossession(wl, stat, type) {
    let result = 0;
    if (type === 'all') {
        result = getAvgPossessionForAll(wl, stat);
        return result;
    } else if (type === 'current') {
        if (wl !== null) {
            wl.forEach(element => {
                if (!element.disconnectedFromEA) {
                    result += Number(element[stat]);
                }
            });
            return (Math.round((result / getWeekendLeagueLength(wl)) * 100) / 100);
        }
    }
    return 0;
}

export function getAvgPossessionForAll(wl, stat) {
    let result = 0;
    wl.forEach(data => {
        let weekendLeague = data.weekendLeague;
        weekendLeague.forEach(element => {
            if (!element.disconnectedFromEA) {
                result += Number(element[stat]);
            }
        });
    });
    return (Math.round((result / getAllWeekendLeagueLength(wl)) * 100) / 100);
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
            if (!element.disconnectedFromEA) {
                if (element.userGoals === element.oppGoals) {
                    count += 1;
                }
            }
        });
    }
    return (count);
}

function getPenaltiesCountForAll(wl) {
    let result = 0;
    wl.forEach(data => {
        let weekendLeague = data.weekendLeague;
        weekendLeague.forEach(element => {
            if (!element.disconnectedFromEA) {
                if (element.userGoals === element.oppGoals) {
                    result += 1;
                }
            }
        });
    });
    return (result);
}

export function getPenaltiesLostCount(wl, type) {
    let count = 0;

    if (type === 'all') {
        count = getPenaltiesLostCountForAll(wl);
        return (count);
    } else if (type === 'current') {

        wl.forEach(element => {
            if (!element.disconnectedFromEA) {
                if (element.userGoals === element.oppGoals) {
                    if (element.userPenScore < element.oppPenScore) {
                        count += 1;
                    }
                }
            }
        });
    }
    return (count);
}

function getPenaltiesLostCountForAll(wl) {
    let result = 0;
    wl.forEach(data => {
        let weekendLeague = data.weekendLeague;
        weekendLeague.forEach(element => {
            if (!element.disconnectedFromEA) {
                if (element.userGoals === element.oppGoals) {
                    if (element.userPenScore < element.oppPenScore) {
                        result += 1;
                    }
                }
            }
        });
    });
    return (result);
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
    let result = 0;
    wl.forEach(data => {
        let weekendLeague = data.weekendLeague;
        weekendLeague.forEach(element => {
            if (element[stat]) {
                result += 1;
            }
        });
    });
    return (result);
}

export function getTop5Formation(wl, type) {

    let counts = {};
    let result = [];

    if (type === 'all') {
        result = getTop5FormationsForAll(wl);
        return (result);
    } else if (type === 'current') {

        wl.forEach(element => {
            if (!element.disconnectedFromEA) {
                //checks if counts object contains element already, if so, +1, else = 1
                counts[element.oppFormationSelected] = counts[element.oppFormationSelected]
                    ? counts[element.oppFormationSelected] + 1
                    : 1;
            }
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

        // console.log(result);
    }

    return result;

}

function getTop5FormationsForAll(wl) {
    let counts = {};
    let result = [];

    wl.forEach(data => {
        let weekendLeague = data.weekendLeague;
        weekendLeague.forEach(element => {
            if (!element.disconnectedFromEA) {
                //checks if counts object contains element already, if so, +1, else = 1
                counts[element.oppFormationSelected] = counts[element.oppFormationSelected]
                    ? counts[element.oppFormationSelected] + 1
                    : 1;
            }
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
            return {Formation: x[0], Count: x[1]};

        });

    return result;
}

export function getTop5SquadTypes(wl, type) {
    let counts = {};
    let result = [];

    if (type === 'all') {
        result = getTop5SquadTypeForAll(wl);
        return (result);
    } else if (type === 'current') {

        wl.forEach(element => {
            if (!element.disconnectedFromEA) {
                element
                    .oppSquad
                    .forEach(squad => {
                        counts[squad] = counts[squad]
                            ? counts[squad] + 1
                            : 1;
                    });
            }
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
    let counts = {};
    let result = [];

    wl.forEach(data => {
        let weekendLeague = data.weekendLeague;
        weekendLeague.forEach(element => {
            if (!element.disconnectedFromEA) {
                element
                    .oppSquad
                    .forEach(squad => {
                        counts[squad] = counts[squad]
                            ? counts[squad] + 1
                            : 1;
                    });
            }
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

    return result;
}

function getWeekendLeagueLength(wl) {
    let len = wl.length;
    wl.forEach(element => {
        if (element.disconnectedFromEA) {
            len--;
        }
    });
    return len;
}

function getAllWeekendLeagueLength(wl) {
    let len = 0;
    wl.forEach(data => {
        let weekendLeague = data.weekendLeague;
        len += weekendLeague.length;
        weekendLeague.forEach(element => {
            if (element.disconnectedFromEA) {
                len--;
            }
        });
    });

    return len;
}

function round(number) {
    return (Math.round(number * 100) / 100).toFixed(2);
}