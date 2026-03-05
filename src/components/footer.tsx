export function Footer() {
    return (
        <footer className="w-full flex items-center justify-center py-6 border-t border-divider mt-auto">
            <p className="text-sm text-default-500 text-center px-4">
                &copy; {new Date().getFullYear()} RuangIbadah — Dibuat oleh komunitas{" "}
                <a
                    href="https://github.com/Kata-mamah-aku-calon-engineer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                >
                    Kata-mamah-aku-calon-engineer
                </a>
            </p>
        </footer>
    );
}
