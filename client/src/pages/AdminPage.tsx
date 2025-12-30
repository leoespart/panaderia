import React, { useState, useEffect } from "react";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { SiteData } from "@/types";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
    const [siteData, setSiteData] = useState<SiteData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/content");
                const data = await res.json();
                setSiteData(data);
            } catch (error) {
                console.error("Failed to fetch site data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading || !siteData) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <AdminPanel
                    siteData={siteData}
                    setSiteData={setSiteData}
                />
            </div>
        </div>
    );
}
