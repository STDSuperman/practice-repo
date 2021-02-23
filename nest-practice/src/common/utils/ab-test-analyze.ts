export default function analyze(req, res, next) {
    process.send('message');
    next();
}