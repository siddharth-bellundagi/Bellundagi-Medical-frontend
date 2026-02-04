function Footer() {
  return (
    <footer className="mt-auto border-t bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} All rights reserved |{" "}
          <span className="font-medium">
            Siddharth Bellundagi
          </span>
        </p>

        <p className="mt-1">
          Project Owner:{" "}
          <span className="font-medium">Siddharth Bellundagi</span>{" "}
          |{" "}
          <a
            href="https://www.linkedin.com/in/siddharth-bellundagi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
