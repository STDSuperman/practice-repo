module.exports = appInfo => {

    const config = {
        keys: 'molu',
        middleware: ['graphql']
    };

    const graphql = {
        router: '/graphql',
        enable: true,
        agent: false
    }


    return {
        ...config,
        graphql
    }
}