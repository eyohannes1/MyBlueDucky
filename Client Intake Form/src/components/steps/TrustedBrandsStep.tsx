
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus, Trash2, Building2 } from "lucide-react";

export function TrustedBrandsStep() {
    const { register, control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "trustedBrands"
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">Strategic Alliances</h2>
                <p className="text-gray-400">Add logos or names of trusted partners.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {fields.map((field, index) => (
                    <div key={field.id} className="relative p-4 rounded-xl border border-white/5 bg-white/5 hover:border-white/20 transition-all group">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            className="absolute right-2 top-2 h-6 w-6 text-white/20 hover:text-red-400 hover:bg-red-500/10"
                        >
                            <Trash2 className="h-3 w-3" />
                        </Button>

                        <div className="space-y-3">
                            <Label className="flex items-center gap-2 text-white/50">
                                <Building2 className="h-3 w-3" /> Brand {index + 1}
                            </Label>
                            <Input {...register(`trustedBrands.${index}.name`)} placeholder="Brand Name" className="bg-black/20 text-sm" />
                            <Input {...register(`trustedBrands.${index}.logoUrl`)} placeholder="Logo URL (Optional)" className="bg-black/20 text-xs font-mono text-white/40" />
                        </div>
                    </div>
                ))}

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ name: "", logoUrl: "" })}
                    className="h-full min-h-[140px] border-dashed border-white/10 hover:border-white/30 hover:bg-white/5 flex flex-col items-center justify-center gap-2 text-white/30"
                >
                    <Plus className="h-6 w-6" /> Add Brand
                </Button>
            </div>
        </div>
    );
}
