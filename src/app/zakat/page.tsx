"use client";

import { useState } from "react";
import { Calculator, Coins, Wheat, Wallet, PiggyBank } from "lucide-react";

type ZakatTab = "penghasilan" | "emas" | "tabungan" | "fitrah";

const GOLD_PRICE_PER_GRAM = 1_050_000; // Approx Rp per gram
const NISAB_GOLD_GRAMS = 85;
const NISAB_AMOUNT = GOLD_PRICE_PER_GRAM * NISAB_GOLD_GRAMS;
const ZAKAT_RATE = 0.025;
const RICE_PRICE_PER_LITER = 15_000;
const FITRAH_LITERS = 2.5;

function formatCurrency(n: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

const TABS: { id: ZakatTab; label: string; icon: React.ReactNode; shortLabel: string }[] = [
    { id: "penghasilan", label: "Zakat Penghasilan", shortLabel: "Penghasilan", icon: <Wallet size={18} /> },
    { id: "emas", label: "Zakat Emas & Perak", shortLabel: "Emas", icon: <Coins size={18} /> },
    { id: "tabungan", label: "Zakat Tabungan", shortLabel: "Tabungan", icon: <PiggyBank size={18} /> },
    { id: "fitrah", label: "Zakat Fitrah", shortLabel: "Fitrah", icon: <Wheat size={18} /> },
];

export default function ZakatPage() {
    const [tab, setTab] = useState<ZakatTab>("penghasilan");

    // Penghasilan
    const [gajiPerBulan, setGajiPerBulan] = useState("");
    const [pendapatanLain, setPendapatanLain] = useState("");

    // Emas
    const [beratEmas, setBeratEmas] = useState("");

    // Tabungan
    const [totalTabungan, setTotalTabungan] = useState("");
    const [hutang, setHutang] = useState("");

    // Fitrah
    const [jumlahOrang, setJumlahOrang] = useState("1");
    const [hargaBeras, setHargaBeras] = useState(RICE_PRICE_PER_LITER.toString());

    const calculate = () => {
        switch (tab) {
            case "penghasilan": {
                const total = (parseFloat(gajiPerBulan || "0") + parseFloat(pendapatanLain || "0")) * 12;
                const wajib = total >= NISAB_AMOUNT;
                const zakat = wajib ? total * ZAKAT_RATE : 0;
                return { total, wajib, zakat, zakatPerBulan: wajib ? zakat / 12 : 0 };
            }
            case "emas": {
                const grams = parseFloat(beratEmas || "0");
                const totalValue = grams * GOLD_PRICE_PER_GRAM;
                const wajib = grams >= NISAB_GOLD_GRAMS;
                const zakat = wajib ? totalValue * ZAKAT_RATE : 0;
                return { total: totalValue, wajib, zakat, grams };
            }
            case "tabungan": {
                const tabunganVal = parseFloat(totalTabungan || "0");
                const hutangVal = parseFloat(hutang || "0");
                const total = tabunganVal - hutangVal;
                const wajib = total >= NISAB_AMOUNT;
                const zakat = wajib ? total * ZAKAT_RATE : 0;
                return { total: tabunganVal, bersih: total, wajib, zakat };
            }
            case "fitrah": {
                const orang = parseInt(jumlahOrang || "1");
                const harga = parseFloat(hargaBeras || RICE_PRICE_PER_LITER.toString());
                const zakat = orang * FITRAH_LITERS * harga;
                return { orang, harga, zakat, wajib: true };
            }
        }
    };

    const result = calculate();

    return (
        <div className="py-6 sm:py-10 flex flex-col gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-3xl mx-auto w-full px-4">
            <div className="text-center space-y-2 sm:space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    <Calculator size={16} />
                    Kalkulator
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-foreground">Kalkulator Zakat</h1>
                <p className="text-default-500 text-sm sm:text-base max-w-lg mx-auto">
                    Hitung kewajiban zakat Anda dengan mudah dan akurat. Pilih jenis zakat di bawah.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap">
                {TABS.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${tab === t.id
                                ? "bg-primary text-white shadow-lg shadow-primary/25"
                                : "bg-default-100 text-default-600 hover:bg-default-200"
                            }`}
                    >
                        {t.icon}
                        <span className="hidden sm:inline">{t.label}</span>
                        <span className="sm:hidden">{t.shortLabel}</span>
                    </button>
                ))}
            </div>

            {/* Calculator Card */}
            <div className="bg-default-50/50 backdrop-blur-md border border-divider shadow-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8">
                <div className="space-y-4 sm:space-y-6">
                    {tab === "penghasilan" && (
                        <>
                            <InputField label="Gaji per Bulan" value={gajiPerBulan} onChange={setGajiPerBulan} placeholder="5000000" />
                            <InputField label="Pendapatan Lain per Bulan" value={pendapatanLain} onChange={setPendapatanLain} placeholder="0" />
                            <InfoBox text={`Nisab: ${formatCurrency(NISAB_AMOUNT)} (setara 85 gram emas)`} />
                        </>
                    )}
                    {tab === "emas" && (
                        <>
                            <InputField label="Berat Emas (gram)" value={beratEmas} onChange={setBeratEmas} placeholder="100" suffix="gram" />
                            <InfoBox text={`Nisab: 85 gram emas. Harga emas: ${formatCurrency(GOLD_PRICE_PER_GRAM)}/gram`} />
                        </>
                    )}
                    {tab === "tabungan" && (
                        <>
                            <InputField label="Total Tabungan / Deposito" value={totalTabungan} onChange={setTotalTabungan} placeholder="100000000" />
                            <InputField label="Total Hutang (opsional)" value={hutang} onChange={setHutang} placeholder="0" />
                            <InfoBox text={`Nisab: ${formatCurrency(NISAB_AMOUNT)} (setara 85 gram emas)`} />
                        </>
                    )}
                    {tab === "fitrah" && (
                        <>
                            <InputField label="Jumlah Jiwa (orang)" value={jumlahOrang} onChange={setJumlahOrang} placeholder="1" type="number" />
                            <InputField label="Harga Beras per Liter" value={hargaBeras} onChange={setHargaBeras} placeholder="15000" />
                            <InfoBox text={`Standar: ${FITRAH_LITERS} liter beras per jiwa`} />
                        </>
                    )}
                </div>

                {/* Result */}
                <div className="mt-6 sm:mt-8 pt-6 border-t border-divider">
                    <div className={`rounded-2xl p-4 sm:p-6 ${result.wajib ? "bg-success/10 border border-success/30" : "bg-default-100 border border-divider"}`}>
                        {result.wajib ? (
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                                    <p className="text-success font-bold text-sm sm:text-base">Wajib Zakat ✓</p>
                                </div>
                                <div className="text-center py-2 sm:py-4">
                                    <p className="text-xs sm:text-sm text-default-500 mb-1">Zakat yang harus dibayarkan</p>
                                    <p className="text-3xl sm:text-4xl font-black text-success">{formatCurrency(result.zakat)}</p>
                                    {tab === "penghasilan" && "zakatPerBulan" in result && (
                                        <p className="text-xs sm:text-sm text-default-500 mt-2">
                                            atau <strong className="text-foreground">{formatCurrency(result.zakatPerBulan as number)}/bulan</strong>
                                        </p>
                                    )}
                                </div>
                                <p className="text-xs text-default-400 text-center">Tarif zakat: 2,5% dari total harta yang mencapai nisab</p>
                            </div>
                        ) : (
                            <div className="text-center py-2 sm:py-4 space-y-2">
                                <p className="text-default-500 font-medium text-sm sm:text-base">Belum mencapai nisab</p>
                                <p className="text-xs text-default-400">
                                    Harta Anda belum memenuhi batas nisab untuk wajib zakat. Namun, Anda tetap bisa bersedekah.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function InputField({
    label, value, onChange, placeholder, suffix, type = "text"
}: {
    label: string; value: string; onChange: (v: string) => void; placeholder: string; suffix?: string; type?: string;
}) {
    return (
        <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5 sm:mb-2">{label}</label>
            <div className="relative">
                {!suffix && <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-default-400 text-sm font-medium">Rp</span>}
                <input
                    type={type}
                    inputMode="numeric"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full bg-background border border-divider rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-foreground font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${!suffix ? "pl-9 sm:pl-12" : ""}`}
                />
                {suffix && <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-default-400 text-sm">{suffix}</span>}
            </div>
        </div>
    );
}

function InfoBox({ text }: { text: string }) {
    return (
        <div className="bg-primary/5 border border-primary/20 rounded-xl px-3 sm:px-4 py-2 sm:py-3">
            <p className="text-xs sm:text-sm text-primary/80">{text}</p>
        </div>
    );
}
