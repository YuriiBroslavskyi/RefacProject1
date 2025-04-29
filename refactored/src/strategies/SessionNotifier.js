class SessionNotifier {
    notify(session, message) {
        session.lastMessage = message;
    }
}

module.exports = SessionNotifier;
