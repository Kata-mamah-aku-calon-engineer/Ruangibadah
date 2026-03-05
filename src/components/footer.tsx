export function Footer() {
    return (
        <footer className="w-full flex items-center justify-center py-6 border-t border-divider mt-auto">
            <p className="text-sm text-default-500">
                &copy; {new Date().getFullYear()} RuangIbadah. Made with ❤️
            </p>
        </footer>
    );
}
