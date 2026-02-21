
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus, Trash2, MessageSquare, Star } from "lucide-react";
import { Textarea } from "../ui/textarea";

export function ReviewsStep() {
    const { register, control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "testimonials"
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-300 to-rose-400 bg-clip-text text-transparent">Social Signals</h2>
                <p className="text-orange-200/70">Gather testimonials to build improved trust metrics.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {fields.map((field, index) => (
                    <div key={field.id} className="relative p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md hover:border-orange-400/30 transition-all duration-300 shadow-md">

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            className="absolute right-3 top-3 h-8 w-8 text-white/20 hover:text-red-400 hover:bg-black/20"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center gap-2 mb-4 text-orange-400 font-semibold uppercase tracking-wider text-xs">
                            <MessageSquare className="h-3 w-3" /> Testimonial {index + 1}
                        </div>

                        <div className="space-y-4">
                            <Textarea
                                {...register(`testimonials.${index}.quote`)}
                                placeholder='"This service transformed our business..."'
                                className="bg-black/20 border-white/10 text-lg italic text-white/90 font-serif leading-relaxed min-h-[100px]"
                            />

                            <div className="flex gap-3">
                                <div className="flex-1 space-y-1">
                                    <Label className="text-xs text-white/40">Author Name</Label>
                                    <Input {...register(`testimonials.${index}.name`)} placeholder="Jane Doe" className="bg-black/20 font-bold" />
                                </div>
                                <div className="space-y-1 w-24">
                                    <Label className="text-xs text-white/40">Rating</Label>
                                    <div className="relative">
                                        <Star className="absolute left-2 top-2.5 h-3 w-3 text-yellow-400 fill-yellow-400 pointer-events-none" />
                                        <Input
                                            type="number"
                                            min="1"
                                            max="5"
                                            {...register(`testimonials.${index}.rating`)}
                                            className="pl-7 bg-black/20 font-mono text-center"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Input {...register(`testimonials.${index}.role`)} placeholder="CEO, TechCorp" className="bg-white/5 border-0 text-xs text-white/60" />
                            <Input {...register(`testimonials.${index}.avatarUrl`)} placeholder="Avatar URL (Optional)" className="bg-white/5 border-0 text-xs text-white/30 font-mono" />
                        </div>
                    </div>
                ))}

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ name: "", quote: "", rating: 5 })}
                    className="h-full min-h-[300px] border-dashed border-white/10 hover:border-orange-400 hover:text-orange-300 hover:bg-orange-500/10 rounded-2xl transition-all flex flex-col items-center justify-center gap-3 text-white/30"
                >
                    <Plus className="h-8 w-8" />
                    <span>Add Testimonial</span>
                </Button>
            </div>
        </div>
    );
}
