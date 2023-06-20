import Link from "next/link";

export default function Privacy() {
  return (
    <div className="privacy-policy flex-1">
      <h1>Privacy Policy</h1>
      <p>Last updated: June 18, 2023</p>

      <p>
        Your privacy is important to us. This Privacy Policy outlines the types
        of information we collect when you use our website, as well as some of
        the steps we take to safeguard it.
      </p>

      <h2>Information We Collect</h2>

      <p>
        We do not collect any personally identifiable information directly. This
        means we do not collect information such as your name, address, phone
        number, or email address.
      </p>

      <p>
        We do however use third-party services for certain operations, and these
        services may collect or receive certain information indirectly.
      </p>

      <p>
        Here are the third-party services we use and the information they
        collect:
      </p>

      <ol>
        <li>
          <strong>Cloudflare for Website Security:</strong> Cloudflare helps us
          keep our website secure. It may collect some information about your
          visit to our website, including but not limited to details about your
          device and browser, time of visit, and it may also set and read
          cookies. For more information, please refer to{" "}
          <Link
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Cloudflare’s privacy policy
          </Link>
          .
        </li>
        <li>
          <strong>Cloudflare Turnstile for Bot Protection:</strong> This service
          helps us identify and block malicious automated traffic. It may
          collect data similar to Cloudflare’s security service.
        </li>
        <li>
          <strong>Upstash for Rate Limiting:</strong> We use Upstash to manage
          the rate of incoming requests to our website to ensure smooth
          functioning. In order to facilitate this, IP addresses are used.
          However, to respect privacy, we anonymize IP addresses by hashing them
          before they are processed by Upstash. This hashing procedure prevents
          us from identifying individual users based on their IP addresses.
        </li>
        <li>
          <strong>Umami for Non Personally Identifiable Analytics:</strong>{" "}
          Umami helps us understand how users interact with our website without
          collecting any personally identifiable information. This includes data
          such as the number of users visiting our site, the pages they visit,
          and the duration of their visits. For more information, please refer
          to{" "}
          <Link
            href="https://umami.is/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Umami’s privacy policy
          </Link>
          .
        </li>
      </ol>

      <h2>How We Use Information</h2>

      <p>
        We use the information we collect to provide, maintain, protect, and
        improve our website, and to develop new services and features. We do not
        use the information we collect to identify individual users.
      </p>

      <h2>Consent</h2>

      <p>
        By using our website, you hereby consent to our Privacy Policy and agree
        to its terms.
      </p>

      <h2>Changes to This Privacy Policy</h2>

      <p>
        {`We reserve the right to make changes to this Privacy Policy. We will
        inform you of any changes by updating the 'last updated' date at the top
        of this page. We encourage you to periodically review this Privacy
        Policy for any changes.`}
      </p>

      <h2>Contact Us</h2>

      <p>
        If you have any questions or concerns about our Privacy Policy, please{" "}
        <Link href="/contact" className="link">
          contact us through our website
        </Link>
        .
      </p>
    </div>
  );
}
