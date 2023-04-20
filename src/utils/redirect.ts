interface RedirectMsg {
    path: string
    query: string
}

export function saveRedirectRoute(pathname: string, query: string) {
    // const routeMsg = router.currentRoute.value
    sessionStorage.setItem('redirect', JSON.stringify({
        path: pathname,
        query: query
    }))
}


export function getRedirectRoute(): RedirectMsg {
    return JSON.parse(sessionStorage.getItem('redirect') || "{path: '',query: ''}")
}

export function removeRedirectRoute() {
    sessionStorage.removeItem('redirect')
}
