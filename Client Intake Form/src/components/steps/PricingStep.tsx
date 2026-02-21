
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus, Trash2, DollarSign } from "lucide-react";

export function PricingStep() {
    const { register, control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "pricingTiers"
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent">Resource Allocation</h2>
                <p className="text-yellow-200/70">Configure the pricing tiers and value proposition.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {fields.map((field, index) => (
                    <div key={field.id} className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.1)] hover:shadow-[0_0_30px_rgba(251,191,36,0.2)] transition-all duration-300 group">

                        <div className="absolute right-3 top-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                className="h-8 w-8 text-red-400 opacity-50 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-300 transition-all"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        <h4 className="flex items-center gap-2 font-bold text-yellow-500 mb-4">
                            <DollarSign className="h-4 w-4" /> Tier {index + 1}
                        </h4>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs uppercase tracking-wider text-white/50">Plan Name</Label>
                                <Input {...register(`pricingTiers.${index}.name`)} placeholder="STARTER" className="font-bold bg-black/20" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs uppercase tracking-wider text-white/50">Price</Label>
                                <Input {...register(`pricingTiers.${index}.price`)} placeholder="$499" className="text-lg bg-black/20" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs uppercase tracking-wider text-white/50">Subtitle</Label>
                                <Input {...register(`pricingTiers.${index}.subtitle`)} placeholder="Best for small teams" className="bg-black/20 text-xs" />
                            </div>

                            <div className="pt-2 flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id={`highlight-${index}`}
                                    {...register(`pricingTiers.${index}.isHighlighted`)}
                                    className="rounded border-white/20 bg-black/40 text-yellow-500 focus:ring-yellow-500/50"
                                />
                                <Label htmlFor={`highlight-${index}`} className="text-sm cursor-pointer hover:text-yellow-400 transition-colors">Highlight this plan</Label>
                            </div>
                        </div>
                    </div>
                ))}

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ name: "", price: "", features: [], isHighlighted: false })}
                    className="h-full min-h-[300px] border-dashed border-white/10 hover:border-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-2xl transition-all flex flex-col items-center justify-center gap-3 text-white/30"
                >
                    <Plus className="h-10 w-10" />
                    <span>Add New Tier</span>
                </Button>
            </div>
        </div>
    );
}
