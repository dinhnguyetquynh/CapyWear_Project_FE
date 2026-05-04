import { useTranslations } from "next-intl";

// components/common/footer.tsx
export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold mb-4">CLOTHING STORY</h2>
          <p className="text-gray-500 text-sm max-w-xs">
           {t("story")}
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">{t("support")}</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>{t("returnPolicy")}</li>
            <li>{t("sizeGuide")}</li>
            <li>{t("orderCheck")}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">{t("connect")}</h4>
          <div className="flex gap-4 text-xl">
            <span>FB</span> <span>IG</span> <span>TT</span>
          </div>
        </div>
      </div>
      <div className="border-t py-6 text-center text-sm text-gray-400">
        © 2026 Clothing Story. All rights reserved.
      </div>
    </footer>
  );
}